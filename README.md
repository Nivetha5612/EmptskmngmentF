
# Employee Task Management System – Backend

## System Overview

This project contains the backend API for the Employee Task Management System.  
It is built using **ASP.NET Core Web API** and **Entity Framework Core** with SQL Server.  
The API handles employee management, task assignment, and task status updates.

The backend provides REST APIs that are consumed by the React frontend.


## Technology Stack

Framework: ASP.NET Core Web API  
Database: SQL Server with Entity Framework Core  
Real-time updates: SignalR  
Architecture: Repository Pattern with DTOs  



## Core Features

- Manage employees
- Create and assign tasks to employees
- Update task status (Pending / In Progress / Completed)
- Delete tasks
- Filter tasks by status
- Real-time updates using SignalR



## System Initialization

Before running the project:

1. Make sure **SQL Server** is installed.
2. Update the **database connection string** in `appsettings.json`.
3. Apply the database migrations.



## Database Setup

This project uses **Entity Framework Core migrations**.

Run the following command to create the database:

dotnet ef database update

All migration scripts are available in the **Migrations** folder.



## Running the Backend

Clone the repository:

git clone https://github.com/Nivetha5612/EmpManagementB.git   

Navigate to the project folder:

cd EmpManagementB

Run the API:

dotnet run

The API will run at:

http://localhost:5000



## Frontend Repository

Frontend code for this project:

https://github.com/Nivetha5612/EmptskmngmentF
