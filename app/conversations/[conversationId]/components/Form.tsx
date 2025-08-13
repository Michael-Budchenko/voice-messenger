'use client';

import useConversation from '@/app/hooks/useConversation';
import axios from 'axios';
import { CldUploadButton } from 'next-cloudinary';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FaImage } from 'react-icons/fa6';
import { HiPaperAirplane } from 'react-icons/hi2';
import MessageInput from './MessageInput';

const Form = () => {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: '',
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true });
    axios.post('/api/messages', {
      ...data,
      conversationId,
    });
  };
  const handleUpload = (result: any) => {
    const imageUrl = result?.info?.secure_url;
    if (!imageUrl) return;

    axios.post('/api/messages', {
      message: '',
      image: imageUrl,
      conversationId,
    });
  };

  return (
    <div className="flex w-full items-center gap-2 border-t bg-white px-4 py-4 lg:gap-4">
      <CldUploadButton options={{ maxFiles: 1 }} onSuccess={handleUpload} uploadPreset="xbaw2jid">
        <FaImage size={30} className="text-indigo-500" />
      </CldUploadButton>

      <form className="flex w-full items-center gap-2 lg:gap-4" onSubmit={handleSubmit(onSubmit)}>
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />
        <button
          type="submit"
          className="cursor-pointer rounded-full bg-indigo-500 p-2 text-white transition hover:bg-indigo-600"
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default Form;
