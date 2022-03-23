import {
  findNotificationById,
  findUserNotifications,
  updateNotification,
} from '../../models/notification.model.js';
import { HttpError } from '../../utils/HttpError.js';

async function httpFindNotifications(req, res, next) {
  const userId = req.user._id;
  try {
    const notifications = await findUserNotifications(userId);
    return res.status(200).json({ notifications });
  } catch (error) {
    return next(new HttpError(error.message));
  }
}

async function httpUpdateNotification(req, res, next) {
  const { id } = req.params;

  try {
    const notification = await findNotificationById(id);
    if (!notification) {
      return next(new HttpError('Not Found', 404));
    } else if (notification.toUserId !== req.user._id) {
      return next(new HttpError('Unauthorized', 403));
    }
    const updatedNotification = await updateNotification(id, { seen: true });
    return res.status(200).json({ notification: updatedNotification });
  } catch (e) {
    return next(new HttpError(e.message));
  }
}

export { httpFindNotifications, httpUpdateNotification };
