
# Task Management System

This Task Management System is a web application developed using React.js for the frontend, Node.js with Express.js for the backend, and MongoDB for the database. The project incorporates user authentication with three roles: customer, employee, and general user.


## 🌐 Features

* __User Authentication:__ 
   * Customer, Employee, and User login functionality.
   * Secure authentication using JSON Web Tokens (JWT).
   
* __Role-based Access:__ 

  * Different roles (Customer, Employee, User) with   specific privileges.
  * Customers can assign tasks to employees.
Employees can view assigned tasks and mark them as completed.

* __Task Management:__ 

   * Customers can create and assign tasks to specific employees.
   * Employees can see assigned tasks and provide updates on completion.

* __API Endpoints::__ 

   * Well-defined APIs for various functionalities, ensuring seamless integration with frontend.
## 🖥️ Tech Stack

 * __Frontend__:

   * React.js for building the user interface.
     CSS and Bootstrap for styling.
   * React Bootstrap for enhanced UI components.
* __Backend__:

   * Node.js with Express.js for server-side development.
  * MongoDB for data storage.
## 🎯 Getting Started

1. __Clone the Repository:__

       https://github.com/Vijayarajvijay/Task-Manager-FE
2. __Install Dependencies:__
        
                cd task-management
                  npm install

3. __Configure Environment Variables:__

* Create a .env file in the root directory and configure the following variables:

       PORT=3000
       MONGODB_URI=your_mongodb_connection_string
       JWT_SECRET=your_jwt_secret_key
4. __Run the Application:__
           
                         npm start

5. __Access the Application:__

* Open your browser and navigate to http://localhost:3000.



6. __Backend Postman URl :__  

       https://documenter.getpostman.com/view/30449043/2s9YyqjNTJ

 7. __Backend Source code :__

        https://github.com/Vijayarajvijay/Task-manager-BE

8. __Netlify Deployed Url For Live:__

       https://profound-squirrel-03efdb.netlify.app/


## 📌 Project Structure:

* __client :__ React.js frontend code.
* __server :__ Node.js backend code.
## 🗝️ Sample User Logins :

1. __Employee Login:__

* Email : employee1@gmail.com
* Password : Password@123

2. __Customer Login :__
* Email : customer1@gmail.com
* Password : Password@123

