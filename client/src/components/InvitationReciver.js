import React, { useEffect } from 'react';
import cable from '../Cable'
import {RiNotification3Line} from 'react-icons/ri'
import { useDispatch } from 'react-redux';
import { addInvite } from '../reducers/userSlice';

const InvitationReceiver = ({user, open, setOpen}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const subscription = cable.subscriptions.create('InvitationChannel', {
      received: (data) => {
        dispatch(addInvite(data.invitation))
      },
    });

    return () => {
      cable.subscriptions.remove(subscription);
    };
  }, [dispatch]);

  return(
    <div className='flex'>
      <RiNotification3Line title='Notifications' className='text-white text-3xl' onClick={() => setOpen(!open)}/>
      {user.received_invitations.length > 0? 
      <div className='flex relative text-white w-5 h-5 rounded-full bg-blue-400 justify-center place-items-center -left-[25%] -top-[20%]'>
        {user.received_invitations.length}
      </div> :null}
    </div>
  );
};

export default InvitationReceiver;
