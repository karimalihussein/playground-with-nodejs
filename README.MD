# Node JS (ExpressJs) + MongoDB (Mongoose) + API REST with JWT, CRUD, with advanced topics

## 0 - Introduction

- This is a project to learn NodeJS, ExpressJS, MongoDB, Mongoose, API REST, JWT, CRUD, and advanced topics, like logging, testing, 
## 1 - What is Logging and why is it important and how to do it in NodeJS

### 1.1 - What is Logging and why is it important

- Logging refers to the practice of recording events, messages, and activities that occur during the execution of a program or system. It involves capturing relevant information and storing it in a log file or a centralized logging system for later analysis, debugging, or monitoring purposes. Logging is important for several reasons:

- **Debugging and troubleshooting**: Logs provide valuable insights into the behavior of an application, helping developers identify and diagnose issues, errors, and unexpected behaviors. By examining log messages, developers can trace the execution flow, understand the sequence of events, and pinpoint the source of problems.

- **Monitoring and performance analysis**: Logs allow administrators and operators to monitor the health and performance of systems and applications. By analyzing log data, they can detect anomalies, track usage patterns, measure response times, and identify potential bottlenecks or performance issues.

- **Auditing and compliance**: Logging plays a crucial role in maintaining a record of system activities, user actions, and security events. Logs can be used for auditing purposes, compliance requirements, and forensic investigations, providing a detailed account of what occurred within a system.

### 1.2 - How to do it in NodeJS

In Node.js, you can perform logging using various libraries. One popular library is Winston, which provides a flexible and extensible logging framework. Here's an example of how to use Winston for logging in Node.js:

- Install Winston using npm:

```bash
npm install winston
```

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










