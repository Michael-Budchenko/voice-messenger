import getConversationById from '@/app/actions/getConversationsById';
import getMessages from '@/app/actions/getMessages';
import EmptyState from '@/app/components/EmptyState';
import Body from './components/Body';
import Form from './components/Form';
import Header from './components/Header';

interface IParams {
  conversationId: string;
}

const ConversationPage = async ({ params }: { params: Promise<IParams> }) => {
  const { conversationId } = await params;

  const conversation = await getConversationById(conversationId);
  const messages = await getMessages(conversationId);

  if (!conversation) {
    return (
      <div className="h-full lg:pl-80">
        <div className="flex h-full flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full lg:pl-80">
      <div className="flex h-full flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ConversationPage;
