'use client';

import { User } from '@/app/generated/prisma';
import axios from 'axios';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Modal from '../Modal';
import Button from '../buttons/Button';
import Input from '../inputs/Input';

interface SettingsModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
}
const SettingsModal = ({ isOpen, onClose, currentUser }: SettingsModalProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });
  const image = watch('image');

  const handleUpload = (result: any) => {
    setValue('image', result?.info?.secure_url, {
      shouldValidate: true,
    });
  };
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post('/api/settings', data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => {
        toast.error('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-zinc-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-zinc-900">Profile</h2>
            <p className="mt-1 text-sm leading-6 text-zinc-600">Edit your public information.</p>

            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isLoading}
                label="Name"
                id="name"
                errors={errors}
                required
                register={register}
              />
              <label className="block text-sm font-medium leading-6 text-zinc-900">Photo</label>
              <div className="mt-2 flex items-center gap-x-3">
                <Image
                  width="48"
                  height="48"
                  className="max-h-12 max-w-12 rounded-full"
                  src={image || currentUser?.image || '/images/placeholder.jpg'}
                  alt="avatar"
                />
                <CldUploadWidget
                  uploadPreset="xbaw2jid"
                  options={{ maxFiles: 1 }}
                  onSuccess={handleUpload}
                >
                  {({ open }) => (
                    <Button disabled={isLoading} secondary type="button" onClick={() => open()}>
                      Change
                    </Button>
                  )}
                </CldUploadWidget>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button disabled={isLoading} secondary onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={isLoading} type="submit">
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
