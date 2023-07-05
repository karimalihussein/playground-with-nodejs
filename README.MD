# Node.js (Express.js) + MongoDB (Mongoose) + API REST with JWT, CRUD, and Advanced Topics

# Table of Contents
1. [Introduction](#Introduction)
2. [Logging in Node.js](#logging-in-nodejs)
    1. [What is Logging and Why is it Important](#what-is-logging-and-why-is-it-important)
    2. [How to Do Logging in Node.js](#how-to-do-logging-in-nodejs)
3. [Auditing](#auditing)
    1. [What is Auditing? How To Implement it?](#what-is-auditing-how-to-implement-it)
    2. [Types of Auditing](#types-of-auditing)
    3. [Types of Industries that Rely on Audit Trails](#types-of-industries-that-rely-on-audit-trails)
4. [Swagger](#swagger)
    1. [What is Swagger?](#what-is-swagger)
    2. [How to Implement Swagger in Node.js](#how-to-implement-swagger-in-nodejs)
    4. [Benefits of Using Swagger](#benefits-of-using-swagger)

## 0 - Introduction <a name="Introduction"></a>

- This project is designed to facilitate the learning of Node.js, Express.js, MongoDB, Mongoose, API REST, JWT, CRUD, and advanced topics such as logging and testing.


## 1 - Logging in Node.js <a name="logging-in-nodejs"></a>

- Logging is the process of recording messages to describe events that have occurred while running your software. It's a useful way to understand what's happening in your application, especially when things go wrong.

### 1.1 - What is Logging and Why is it Important <a name="what-is-logging-and-why-is-it-important"></a>

- Logging refers to the practice of recording events, messages, and activities that occur during the execution of a program or system. It involves capturing relevant information and storing it in a log file or a centralized logging system for later analysis, debugging, or monitoring purposes. Logging is important for several reasons:

- **Debugging and Troubleshooting:** Logs provide valuable insights into the behavior of an application, helping developers identify and diagnose issues, errors, and unexpected behaviors. By examining log messages, developers can trace the execution flow, understand the sequence of events, and pinpoint the source of problems.

- **Monitoring and Performance Analysis:** Logs can be used to monitor the health of an application and track its performance over time. By analyzing log messages, developers can identify bottlenecks, detect anomalies, and measure the impact of changes.

- **Auditing and Compliance:** Logging plays a crucial role in maintaining a record of system activities, user actions, and security events. Logs can be used for auditing purposes, compliance requirements, and forensic investigations, providing a detailed account of what occurred within a system.

- **Business Intelligence:** Logs can be used to collect business data and extract valuable insights. By analyzing log messages, developers can gain a better understanding of user behavior, identify usage patterns, and make informed decisions.

### 1.2 - How to Do Logging in Node.js <a name="how-to-do-logging-in-nodejs"></a>

- In Node.js, there are several libraries available for performing logging. One popular library is Winston, which provides a flexible and extensible logging framework. Here's an example of how to use Winston for logging in Node.js:


1. Install Winston using npm:

```bash
npm install winston
```

2. Create a logger instance and configure it:

```javascript
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' })
  ]
});
```

3. Start logging messages using different log levels:

```javascript
logger.log('info', 'This is an informational message.');
logger.log('warn', 'This is a warning message.');
logger.log('error', 'This is an error message.');
```


- The above code snippet creates a logger instance with two transports: Console and File. The Console transport logs messages to the console, while the File transport logs messages to a file named app.log. The logger instance has three methods: log(), warn(), and error(). Each method takes two arguments: the log level and the message to log. The log level can be one of the following: error, warn, info, verbose, debug, or silly. The log() method is used to log messages at the specified level, while the warn() and error() methods are used to log warning and error messages, respectively.

- Remember to handle and propagate any errors that occur during logging to avoid impacting the stability of your application.

- Winston also provides a default logger instance that you can use without creating a new instance. Here's an example of how to use the default logger:

```javascript
const winston = require('winston');
winston.log('info', 'This is an informational message.');
winston.warn('This is a warning message.');
winston.error('This is an error message.');
```

- By adopting logging practices in your Node.js application, you can gain valuable insights into its behavior, enhance troubleshooting capabilities, and improve overall system management and maintenance.


## 3 - Auditing <a name="auditing"></a>
### Auditing (audit trail or audit log)

1. is about recording domain-level events (e.g. user registration, user login, user logout, user deletion, etc.) in a database or log file.
2. Used to answer questions like:
    1. Who did what?
    2. When did they do it?
    3. What was the result?
3. Track user actions, system activities, and security events.

- Auditing in Node.js refers to the process of recording and tracking the activities and events within a system for the purpose of security, compliance, and accountability. It involves capturing relevant information about user actions, system activities, and security events, and storing them in a log or database.

- In the context of Node.js applications, auditing typically involves monitoring and logging various events and actions, such as user authentication and authorization, data access and modifications, system configuration changes, error conditions, and security-related events. The audit logs provide a detailed record of what occurred within the system, including who performed the action, when it happened, and any relevant details.

- Auditing is important for several reasons:
1. **Security:** Auditing helps identify and track potential security breaches, unauthorized access attempts, and suspicious activities within a Node.js application. By analyzing audit logs, security teams can detect anomalies, investigate security incidents, and take appropriate measures to protect the system.

2. **Compliance:** Many industries and organizations have specific compliance requirements, such as HIPAA (Health Insurance Portability and Accountability Act) or GDPR (General Data Protection Regulation). Auditing allows organizations to demonstrate compliance by providing a record of activities and actions that meet regulatory standards.

3. **Accountability:** Auditing ensures accountability by providing a trail of actions performed within the system. In the event of errors, data breaches, or unauthorized activities, audit logs can help identify responsible individuals or processes and hold them accountable.


## 3.1 - What is Auditing? How To Implement it? <a name="what-is-auditing-how-to-implement-it"></a>

- Auditing is the process of recording and tracking the activities and events within a system for the purpose of security, compliance, and accountability. It involves capturing relevant information about user actions, system activities, and security events, and storing them in a log or database.

- To implement auditing in a Node.js application, you can use logging frameworks like Winston or built-in logging capabilities provided by platforms such as AWS CloudTrail or Azure Monitor. Additionally, you can define specific events and actions that need to be audited, and include relevant information such as user identities, timestamps, IP addresses, request parameters, and outcomes.

- It is important to consider security measures to protect the audit logs themselves, ensuring they are tamper-proof and accessible only to authorized individuals or systems. Encryption, access controls, and regular backups are some of the measures that can be applied to ensure the integrity and confidentiality of audit logs.

- Overall, auditing in Node.js helps organizations maintain security, compliance, and accountability by capturing and analyzing system activities and events, providing valuable insights into the behavior and usage of the application.


### 3.2 Type Of Auditing <a name="types-of-auditing"></a>
1. Provides basic information to backtrace the entire trial of events to its origin.
2. Includes User Activity, access to data, login attempts, admininstor, activities or automated system activities.
3. audit records contain elments defined by the company which includes:
    1. User ID
    2. Timestamp
    3. IP Address
    4. Request Parameters
    5. Outcome
4. Audit logs are stored in a secure location and are not accessible to the users.

## 3.3 - Types of Industries that Rely on Audit Trails  <a name="types-of-industries-that-rely-on-audit-trails"></a>

- Audit trails are used in a variety of industries and organizations, including healthcare, finance, government, and technology. Here are some examples of how audit trails are used in different industries:
1. Financial, Accounting, Billing Records.
2. Healthcare.
3. Clinical research.
4. IT helpdesk and support.
5. Content Management Version Control.
6. University Student Records.
7. E-commerce Sales.
8. Legal and Resarch Investigations.
9. Government and Public Records.
10. Manufacturing and Supply Chain.
11. Transportation and Logistics.
12. Risk Management.
13. Insurance Claims.
14. Human Resources.
15. Customer Relationship Management (CRM).
16. Marketing and Advertising.
17. Energy and Utilities.
... etc


## 3.4 - How to Implement Auditing in Node.js <a name="how-to-implement-auditing-in-nodejs"></a>

- To implement auditing in a Node.js application, you can use logging frameworks like Winston or built-in logging capabilities provided by platforms such as AWS CloudTrail or Azure Monitor. Additionally, you can define specific events and actions that need to be audited, and include relevant information such as user identities, timestamps, IP addresses, request parameters, and outcomes.

- It is important to consider security measures to protect the audit logs themselves, ensuring they are tamper-proof and accessible only to authorized individuals or systems. Encryption, access controls, and regular backups are some of the measures that can be applied to ensure the integrity and confidentiality of audit logs.

- Overall, auditing in Node.js helps organizations maintain security, compliance, and accountability by capturing and analyzing system activities and events, providing valuable insights into the behavior and usage of the application.


## 4.0 - Swagger <a name="swagger"></a>

- Swagger is a set of open-source tools built around the OpenAPI Specification that can help you design, build, document and consume REST APIs. The major Swagger tools include:
1. Swagger Editor – browser-based editor where you can write OpenAPI specs.
2. Swagger UI – renders OpenAPI specs as interactive API documentation.
3. Swagger Codegen – generates server stubs and client libraries from an OpenAPI spec.
4. Swagger Inspector – API testing tool (Note: this tool is not open source).



## 4.1 - What is Swagger? <a name="what-is-swagger"></a>

- Swagger is an open-source framework that helps developers design, build, document, and consume RESTful APIs. It provides a set of tools and specifications for describing the structure and functionality of an API in a machine-readable format.

- Swagger is based on the OpenAPI Specification (formerly known as the Swagger Specification), which is a vendor-neutral, language-agnostic, and open specification for describing RESTful APIs. The OpenAPI Specification defines a standard, language-agnostic interface to RESTful APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection.

## 4.2 - How to Implement Swagger in Node.js <a name="how-to-implement-swagger-in-nodejs"></a>

- To implement Swagger in a Node.js project, you can follow these steps:

1. Install dependencies: Start by installing the necessary packages. You'll need swagger-ui-express, swagger-jsdoc, and express packages. Use the following command to install them:

```bash
npm install swagger-ui-express swagger-jsdoc express
```

2. Create a Swagger specification: Define your API's endpoints, parameters, responses, and other details in a Swagger specification file. This file is typically written in YAML or JSON format. Here's an example swagger.yaml file:


```yaml
openapi: 3.0.0
info:
  title: Your API
  version: 1.0.0
  description: API documentation using Swagger
servers:
  - url: http://localhost:3000
paths:
  /example:
    get:
      summary: Retrieve an example
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: object
```

3. Set up Express and Swagger middleware: In your Node.js application, create an Express server and set up the Swagger middleware to serve the Swagger UI and specification. Here's an example app.js file:

```js
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
      description: 'API documentation using Swagger',
    },
  },
  apis: ['your-routes-file.js'], // Path to your routes file
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Define your routes and other middleware

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
```

4. Add annotations to your routes: In your routes file (e.g., your-routes-file.js), use Swagger annotations to document your API endpoints. Here's an example:
  
```js
/**
  * @swagger
  * /example:
  *   get:
  *     summary: Retrieve an example
  *     responses:
  *       '200':
  *         description: Successful response
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  */

app.get('/example', (req, res) => {
  res.json({ success: true });
});
```

5. Start the server: Run the following command to start the server:

```bash
node app.js
```

6. View the Swagger UI: Open http://localhost:3000/api-docs in your browser to view the Swagger UI and interact with your API.

## 4.3 - Benefits of Using Swagger <a name="benefits-of-using-swagger"></a>

- Swagger provides a number of benefits for developers and organizations, including:

1. Design-first approach: Swagger allows you to design your API before you start building it, which helps you get feedback early in the development process and avoid costly rework.
2. Standardization: Swagger provides a standard, language-agnostic interface to RESTful APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection.
3. Documentation: Swagger provides a way to document your API endpoints, parameters, responses, and other details in a machine-readable format.
4. Code generation: Swagger allows you to generate server stubs and client libraries from an OpenAPI spec.
5. Testing: Swagger provides a way to test your API endpoints using the Swagger Inspector tool.
6. Interactive documentation: Swagger UI renders OpenAPI specs as interactive API documentation.
7. Community: Swagger has a large community of developers who contribute to the project and provide support for each other.
8. Open-source: Swagger is an open-source project, which means anyone can contribute to it and use it for free.






