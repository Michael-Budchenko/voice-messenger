'use client';

import Avatar from '@/app/components/Avatar';
import { Conversation, User } from '@/app/generated/prisma';
import useOtherUser from '@/app/hooks/useOtherUser';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { format } from 'date-fns';
import { Fragment, useMemo, useState } from 'react';
import { FaTrashCan, FaX } from 'react-icons/fa6';
import ConfirmModal from './ConfirmModal';

interface ProfileDrawerProps {
  data: Conversation & {
    users: User[];
  };
  isOpen?: boolean;
  onClose: () => void;
}

const ProfileDrawer = ({ data, isOpen, onClose }: ProfileDrawerProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const otherUser = useOtherUser(data);
  const joinedDate = useMemo(
    () => format(new Date(otherUser.createAt), 'PP'),
    [otherUser.createAt]
  );

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }
    return 'Active';
  }, [data]);

  return (
    <>
      <ConfirmModal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} />

      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </TransitionChild>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <TransitionChild
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <DialogPanel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-end">
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-white text-zinc-400 hover:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={onClose}
                            >
                              <span className="sr-only">Close panel</span>
                              <FaX size={24} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className="flex flex-col items-center">
                          <div className="mb-2">
                            <Avatar user={otherUser} />
                          </div>
                          <div>{title}</div>
                          <div className="text-sm text-zinc-500">{statusText}</div>
                          <div className="my-8 flex gap-10">
                            <div
                              onClick={() => setConfirmOpen(true)}
                              className="flex cursor-pointer flex-col items-center gap-3 hover:opacity-75"
                            >
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
                                <FaTrashCan size={20} />
                              </div>
                              <div className="text-sm font-light text-neutral-600">Delete </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                          <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                            {!data.isGroup && (
                              <div>
                                <dt className="text-sm font-medium text-zinc-500 sm:w-40 sm:flex-shrink-0">
                                  Email
                                </dt>
                                <dd className="mt-1 text-sm text-zinc-900 sm:col-span-2 sm:mt-0">
                                  {otherUser.email}
                                </dd>
                              </div>
                            )}
                            {!data.isGroup && (
                              <>
                                <hr />
                                <div>
                                  <dt className="text-sm font-medium text-zinc-500 sm:w-40 sm:flex-shrink-0">
                                    Joined
                                  </dt>
                                  <dd className="mt-1 text-sm text-zinc-900 sm:col-span-2 sm:mt-0">
                                    <time dateTime={joinedDate}>{joinedDate}</time>
                                  </dd>
                                </div>
                              </>
                            )}
                          </dl>
                        </div>
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ProfileDrawer;
