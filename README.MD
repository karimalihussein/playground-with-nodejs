# Introduction to NodeJs.


## What is NodeJs?

NodeJs is a JavaScript runtime built on Chrome's V8 JavaScript engine. NodeJs uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. NodeJs' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.

- NodeJs is a JavaScript runtime environment.
- NodeJs is a platform built on Chrome's JavaScript runtime for easily building fast and scalable network applications.
- NodeJs uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.
- NodeJs is an open source, cross-platform runtime environment for developing server-side and networking applications.

## NodeJS Program Lifecycle

* The lifecycle of a Node.js program refers to the various stages and events that occur during the execution of a Node.js application. Understanding the program lifecycle can help you grasp the flow of execution and handle different events effectively. Here's an overview of the Node.js program lifecycle:The lifecycle of a Node.js program refers to the various stages and events that occur during the execution of a Node.js application. Understanding the program lifecycle can help you grasp the flow of execution and handle different events effectively. Here's an overview of the Node.js program lifecycle:

1 - Start: When you run a Node.js application, the program starts its execution. At this point, the Node.js runtime initializes the environment, sets up internal data structures, and prepares for the execution of your code.

2 - Event Loop: Node.js is known for its event-driven, non-blocking I/O model. The core of this model is the event loop. The event loop constantly checks for events and executes the associated callbacks when an event occurs. It allows Node.js to handle multiple requests concurrently without blocking the execution of other tasks.

3 - Event-Driven Architecture: Node.js programs are built around events and callbacks. You define event handlers or callbacks that get executed when specific events occur. Common events include incoming HTTP requests, database queries, file system operations, timers, and more.

4 - Event Registration: To handle events, you register event handlers or listeners using appropriate methods provided by Node.js, depending on the type of event. For example, you can register an HTTP request listener using the http module, or listen to file system changes using the fs module.

5 - Asynchronous Operations: Node.js excels at handling asynchronous operations. When you perform I/O operations, such as reading from a file, making an HTTP request, or querying a database, you typically use asynchronous functions or methods that accept a callback or return a promise. This allows Node.js to continue executing other tasks while waiting for the asynchronous operation to complete.

6 - Callback Execution: When an asynchronous operation completes, the associated callback is placed in the event queue. The event loop picks up these callbacks from the queue and executes them when the program reaches their turn in the event loop cycle.

7 -Timers: Node.js provides a timer module that allows you to schedule functions to be executed after a specific period or at regular intervals. You can use setTimeout to schedule a one-time execution or setInterval for repeated execution. Timer callbacks are also placed in the event queue and executed by the event loop.

8 - Error Handling: It's important to handle errors effectively in a Node.js program. Errors can occur during I/O operations, network requests, or any other asynchronous tasks. You can use try-catch blocks for synchronous code or handle errors in callbacks or promise chains for asynchronous code.

9 - Program Termination: A Node.js program terminates when there are no more tasks to execute and no pending event handlers or timers. However, you can also explicitly exit the program using the process.exit() method.


- Note: It's worth noting that the lifecycle of a Node.js program can be more complex when you introduce frameworks, libraries, and other modules. They may have their own lifecycle and events specific to their functionality. However, the basic concepts of the Node.js program lifecycle outlined above remain consistent.

## Type of Errors

- Syntax Errors: Syntax errors occur when you write invalid JavaScript code. For example, you may have forgotten to close a bracket or misspelled a keyword. Syntax errors are detected by the JavaScript engine when it parses your code. They prevent the code from running and are usually easy to fix.

- Runtime Errors: Runtime errors occur when your program is running. They are also called exceptions because they indicate that something exceptional (and bad) has happened. For example, you may have tried to access a property of an undefined variable, or called a function that doesn't exist. Runtime errors are detected by the JavaScript engine as it executes your code. They cause the program to terminate abruptly and are usually harder to fix.

- Logical Errors: Logical errors occur when your program is running. They are caused by a flaw in the logic of your code. For example, you may have written a condition that is always true or a loop that never ends. Logical errors are not detected by the JavaScript engine. They cause the program to run incorrectly and are the hardest to fix.


## Express Js
- Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- Express provides a thin layer of fundamental web application features, without obscuring Node.js features that you know and love.
- Express is a fast, unopinionated, minimalist web framework for Node.js.

## Why Express Js?
- Server Logic: Express provides a simple API to build server-side logic. It allows you to define routes, access parameters, handle requests and responses, and perform custom logic. You can also use it to serve static files and handle errors and exceptions.

- Middleware: Express provides a robust set of built-in middleware and third-party middleware to perform additional tasks. For example, you can use middleware to serve static files, compress HTTP responses, set HTTP headers, and more.

- Database Integration: Express doesn't provide any database integration out of the box. However, you can easily integrate any database with your Express application using third-party Node.js libraries.

- Routing: Express provides a simple API to define routes. You can use it to perform different actions based on HTTP method and URL. For example, you can use it to perform CRUD operations on a database.

- Templating: Express doesn't provide any templating engine out of the box. However, you can easily integrate any templating engine with your Express application using third-party Node.js libraries.


 ### Frameworks Like Express
 1 - Koa: Koa is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It's a successor to Express.js and is widely used by the Node.js community.

 2 - Vanilla Node.js: Vanilla Node.js is a term used to refer to the core Node.js runtime without any third-party libraries or frameworks. It's a great way to learn Node.js and understand how it works under the hood.
 
 3 - AdonisJs: AdonisJs is a Node.js web framework with a breath of fresh air and drizzle of elegant syntax on top of it. It offers a stable ecosystem to write server-side web applications so you can focus on business needs over finalizing which package to choose or not.


 ## Middleware
 
 - Middleware is a function that has access to the request and response objects. It can execute any code, transform the request object, or return a response. It can also end the request-response cycle. If the current middleware function does not end the request-response cycle, it must call the next() function to pass control to the next middleware function. Otherwise, the request will be left hanging.

 ### How Middleware Works?

 - Middleware functions are executed sequentially, in the order they are registered. The first middleware function is executed first, followed by the second, and so on. If a middleware function ends the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

 - Note: Middleware functions are executed in the order they are registered. However, you can change the order of execution by changing the order of middleware registrations.

## Templating Middle

- Templating engines allow you to define templates for your web application. They can generate HTML pages dynamically based on some data, such as a database record or user input. Templating engines also allow you to define layouts and partial views that can be reused across multiple pages.

- Express doesn't provide any templating engine out of the box. However, you can easily integrate any templating engine with your Express application using third-party Node.js libraries.

- Some popular templating engines for Express include Pug, EJS, and Handlebars.


# MVC: Model View Controller

- MVC is a software design pattern that divides an application into three interconnected parts: the model, the view, and the controller. Each part is responsible for a specific aspect of the application.

- The model is responsible for managing the data of the application. It receives user input from the controller.

- The view is responsible for displaying the data provided by the model in a specific format. It also receives user input from the controller.

- The controller is responsible for handling user requests and providing data to the view or the model.

- MVC is one of the most frequently used industry-standard web development framework to create scalable and extensible projects.

- MVC helps to achieve separation of concerns. It divides the application into three interconnected parts so that modifications in one part do not affect the other parts. This allows you to reuse the code across different parts of the application.


