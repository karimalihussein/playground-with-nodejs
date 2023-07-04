# Node.js (Express.js) + MongoDB (Mongoose) + API REST with JWT, CRUD, and Advanced Topics

# Table of Contents
1. [Introduction](#Introduction)
2. [Logging in Node.js](#logging-in-nodejs)
    1. [What is Logging and Why is it Important](#what-is-logging-and-why-is-it-important)
    2. [How to Do Logging in Node.js](#how-to-do-logging-in-nodejs)

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
