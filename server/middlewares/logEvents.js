//core modules
const fsPromises = require("fs").promises;
const path = require("path");
const { format } = require("date-fns");
const { v4 : uuid4 } = require("uuid");

const logEvents = async (message) => {
    const datetime = format(new Date(),"yyyy-MM-dd\tHH:mm:ss");
    const uuid = uuid4();
    const event = `${datetime}\t${uuid}\t${message}\n`;

    console.log(event);

    try {
        await fsPromises.access(path.join(__dirname,"logs"),fsPromises.constants.F_OK);
    } catch (accessError) {
        try {
            await fsPromises.mkdir(path.join(__dirname,"logs"));
        } catch (error) {
            console.error("Failed due to :" + error);
            throw error;
        }
    }

    try {
        await fsPromises.appendFile(path.join(__dirname,"logs","eventLogs.txt"),event);
    } catch (error) {
        console.error("Failed due to :" + error);
        throw error;
    }
}

module.exports = logEvents;

