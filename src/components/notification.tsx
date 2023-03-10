import { closeNotification } from '@/redux/slices/notifications';
import { store } from '@/redux/store';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { Alert, Typography } from '@material-tailwind/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function Notification() {
  const notification = useSelector(
    (state: ReturnType<typeof store.getState>) => state.notification,
  );
  const { message, type, show } = notification;
  const dispatch = useDispatch();

  useEffect(() => {
    if (notification.show) {
      setTimeout(() => {
        dispatch(closeNotification(notification));
      }, 5000);
    }
  }, [notification, dispatch]);

  return (
    <div className="absolute top-0 w-full flex justify-center z-50">
      <div className="flex">
        <Alert
          show={show}
          icon={
            type === 'error' ? (
              <ExclamationTriangleIcon className="mt-px h-6 w-6" />
            ) : (
              <CheckCircleIcon className="mt-px h-6 w-6" />
            )
          }
          className={type === 'error' ? 'bg-red-500' : 'bg-green-600'}
        >
          <Typography variant="medium" className="ml-10">
            {message}
          </Typography>
        </Alert>
      </div>
    </div>
  );
}

export default Notification;
