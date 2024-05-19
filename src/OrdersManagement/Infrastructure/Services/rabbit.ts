import amqp from 'amqplib';
import { RabbitMQService } from '../../Application/Services/rabbit';

export class RabbitMQ implements RabbitMQService {
    
    private connection: amqp.Connection | null = null;

    async connect(): Promise<void> {
        try {
            this.connection = await amqp.connect({
                hostname: '127.0.0.1',
                username: process.env.USER_MQTT, 
                password: process.env.USER_MQTT_PASSWORD,  
            });
            console.log('Conectado a RabbitMQ');
        
    }catch(error){
        console.log(error)
    }
}

    async publishMessage(queu: string, message: any): Promise<void> {
        if (!this.connection) {
            throw new Error('RabbitMQ connection not established');
        }
        try {
            console.log(queu,message);
            const messageBuffer = Buffer.from(JSON.stringify(message));
            const channel = await this.connection.createChannel();
            await channel.assertQueue(queu, { durable: false }); 
            channel.sendToQueue(queu,messageBuffer);
            await channel.close();
        await this.connection.close();
        } catch (error) {
            console.log(error)
        }
        
        
    }
}