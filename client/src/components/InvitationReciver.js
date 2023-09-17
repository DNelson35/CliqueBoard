// src/components/InvitationReceiver.js
import React, { useEffect } from 'react';
import cable from '../Cable'
import {RiNotification3Line} from 'react-icons/ri'

const InvitationReceiver = () => {
  useEffect(() => {
    const subscription = cable.subscriptions.create('InvitationChannel', {
      received: (data) => {
        console.log('New invitation:', data.invitation);
      },
    });

    return () => {
      cable.subscriptions.remove(subscription);
    };
  }, []);

  return <div><RiNotification3Line className='text-white text-3xl'/></div>;
};

export default InvitationReceiver;
