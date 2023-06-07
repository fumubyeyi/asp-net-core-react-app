# dotnet core react app

## Architecture pattern
  This application is divided into four projects:
  
    1. API - .net core web app which is the startup project 
    2. Application - business logic with CQRS + Mediator which separates the read and update commands to the data store  
    3. Domain - included defined enitities/models for the application
    4. Persistence - deals with database operations    
    
## Features:
 
 - API handlers for the CRUD operations
 - Sqlite db for data store
 
## Reference
  This application was developed following an Udemy course:
  
  [Complete guide to building an app with .Net Core and React](https://www.udemy.com/course/complete-guide-to-building-an-app-with-net-core-and-react/learn/lecture/24835758#overview)
  

    
