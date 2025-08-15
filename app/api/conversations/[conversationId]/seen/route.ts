import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { pusherServer } from '@/app/libs/pusher';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ conversationId: string }> }
) {
  try {
    const { conversationId } = await params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: { include: { seen: true } },
        users: true,
      },
    });

    if (!conversation) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    const lastMessage = conversation.messages[conversation.messages.length - 1];
    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    const updateMessage = await prisma.message.update({
      where: { id: lastMessage.id },
      include: { sender: true, seen: true },
      data: { seen: { connect: { id: currentUser.id } } },
    });

    await pusherServer.trigger(currentUser.email, 'conversation:update', {
      id: conversationId,
      messages: [updateMessage],
    });

    if (lastMessage.seenIds.includes(currentUser.id)) {
      return NextResponse.json(conversation);
    }

    await pusherServer.trigger(conversationId, 'message:update', updateMessage);

    return NextResponse.json(updateMessage);
  } catch (error) {
    console.error(error, 'ERROR_CONVERSATION_SEEN');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
