// import the library first
var amqp = require('amqplib/callback_api')

// connecting to the server
amqp.connect("amqp://localhost", function (error0, connection) {
    if (error0) {
        console.log(error0.message);
        throw error0;
    }

    connection.createChannel(function (error1, channel) {
        if (error1) {
            console.log(error1.message);
            throw error1;
        }

        var queue = "hello";

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function (msg) {
            // console.log(msg)
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
    })
})