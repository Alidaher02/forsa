import { api } from "./client";
import type { LoginRequest, LoginResponse, RegisterRequest } from "../types/auth";



export async function login(
  credentials: LoginRequest) :Promise<LoginResponse>{
    const response = await api.post<LoginResponse>(
      "/login",
      credentials
    );

    return response.data;
  }

  export async function register(credentials: RegisterRequest): Promise<void> {
    await api.post("/register", credentials);
  }

  
