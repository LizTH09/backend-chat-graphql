import { withFilter } from 'graphql-subscriptions';
import messageController, { CreateMessage } from '../../../../controllers/messages';
import { pubSub } from '../../pubsub';

const Query = {
  getMessages: async (_: any , args: any) => await messageController.getMessages(args) };

const Mutation = {
  createMessage: async (_: any, args: CreateMessage) => {
    const message = await messageController.createMessage(args);
    
    pubSub.publish('createMessage', {
      createMessage: message,
    });    

    return message;
  }
};

const Subscription = {
  createMessage: {
    subscribe: withFilter(
      () => pubSub.asyncIterableIterator('createMessage'), 
      (payload, variables) => String(payload.createMessage.chatId) === String(variables.chatId)
    ),
  },
};

export { Query, Subscription, Mutation };