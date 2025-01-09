import request from "supertest";
import { startServer } from "../server";
import { truncateTables } from "../db/utils/truncateTables";

let app: any;
let server: any;

beforeAll(async () => {
  await truncateTables();
  const result = await startServer(); // Get app instance for testing
  app = result.app;
  server = result.server;
});

afterAll(() => {
  server.close(); // Ensure the server is stopped after tests
});

describe("Authentication Tests", () => {
  it("should register a new user", async () => {
    const mutation = `
      mutation Register($email: String!, $password: String!, $name: String!, $password_confirmation: String!) {
        register(email: $email, password: $password, name: $name, password_confirmation: $password_confirmation) {
            id
            name
            email
        }
      }
    `;

    const variables = {
      email: "test@example.com",
      password: "QWer1234",
      password_confirmation: "QWer1234",
      name: "Test User",
    };

    const response = await request(app)
      .post("/graphql")
      .send({ query: mutation, variables });

    expect(response.status).toBe(200);
    expect(response.body.data.register).toHaveProperty("id");
    expect(response.body.data.register.email).toBe(variables.email);
  });

  it("should login an existing user", async () => {
    const mutation = `
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          user {
            id
            email
          }
          token
        }
      }
    `;

    const variables = {
      email: "test@example.com",
      password: "QWer1234",
    };

    const response = await request(app)
      .post("/graphql")
      .send({ query: mutation, variables });

    expect(response.status).toBe(200);
    expect(response.body.data.login).toHaveProperty("token");
    expect(response.body.data.login.user.email).toBe(variables.email);
  });
});

describe("Tasks Tests", () => {
  let token: any;
  beforeAll(async () => {
    const mutation = `
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          user {
            id
            email
          }
          token
        }
      }
    `;

    const variables = {
      email: "test@example.com",
      password: "QWer1234",
    };

    const response = await request(app)
      .post("/graphql")
      .send({ query: mutation, variables });

    token = response.body.data.login.token;
  });

  it("should add new task", async () => {
    const query = `
      mutation CreateTask($title: String!, $status: TaskStatus!, $description: String) {
        createTask(title: $title, status: $status, description: $description) {
          id
          title
          description
          status
        }
      }
    `;

    const variables = {
      title: "A crazy task",
      status: "pending",
    };

    const response = await request(app)
      .post("/graphql")
      .set("Authorization", `Bearer ${token}`)
      .send({ query, variables });

    expect(response.status).toBe(200);
    expect(response.body.data.createTask.title).toBe(variables.title);
  });

  it("should fetch all tasks", async () => {
    const query = `
      query {
        getAllTasks {
          id
          title
          description
          status
        }
      }
    `;

    const response = await request(app)
      .post("/graphql")
      .set("Authorization", `Bearer ${token}`)
      .send({ query });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data.getAllTasks)).toBe(true);
  });

  it("should fetch a specific task", async () => {
    const query = `
      query GetTask($taskId: Int!) {
        getTask(taskId: $taskId) {
          id
          title
          description
          status
        }
      }
    `;

    const variables = {
      taskId: 1,
    };

    const response = await request(app)
      .post("/graphql")
      .set("Authorization", `Bearer ${token}`)
      .send({ query, variables });

    expect(response.status).toBe(200);
    expect(response.body.data.getTask.id).toBe(String(variables.taskId));
  });

  it("should update a specific task", async () => {
    const query = `
      mutation UpdateTask($taskId: Int!, $status: TaskStatus) {
        updateTask(taskId: $taskId, status: $status) {
          id
          title
          description
          status
        }
      }
    `;

    const variables = {
      taskId: 1,
      status: "completed",
    };

    const response = await request(app)
      .post("/graphql")
      .set("Authorization", `Bearer ${token}`)
      .send({ query, variables });

    expect(response.status).toBe(200);
    expect(response.body.data.updateTask.status).toBe(variables.status);
  });

  it("should delete a specific task", async () => {
    const mutation = `
    mutation DeleteTask($taskId: Int!) {
      deleteTask(taskId: $taskId) {
        id
        title
        description
        status
      }
    }
  `;

    const variables = {
      taskId: 1,
    };

    const response = await request(app)
      .post("/graphql")
      .set("Authorization", `Bearer ${token}`) // Add authorization if required
      .send({ query: mutation, variables });

    // Verify the response status and the task data returned
    expect(response.status).toBe(200);
    expect(response.body.data.deleteTask.id).toBe(String(variables.taskId));

    // Optionally: Verify the task no longer exists
    const fetchQuery = `
    query GetTask($taskId: Int!) {
      getTask(taskId: $taskId) {
        id
      }
    }
  `;

    const fetchResponse = await request(app)
      .post("/graphql")
      .set("Authorization", `Bearer ${token}`)
      .send({ query: fetchQuery, variables });

    // The fetch should return null for a deleted task
    expect(fetchResponse.body.data.getTask).toBeNull();
  });
});
