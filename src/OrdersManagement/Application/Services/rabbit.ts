export interface RabbitMQService {
    connect(): Promise<void>;
    publishMessage(exchange: string, message: any): Promise<void>;
}