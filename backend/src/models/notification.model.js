import { Notification } from './notification.mongo.js';

async function createNotification({ toUserId, fromUserId, postId, type }) {
  const toFromType = `${toUserId}_${fromUserId}_${type}`;
  return await Notification.create({
    toFromType,
    toUserId,
    fromUserId,
    postId,
    type,
  });
}

async function findUserNotifications(toUserId) {
  return await Notification.find({ toUserId, seen: false })
    .sort('-createdAt')
    .limit(10);
}

async function findNotificationById(id) {
  return await Notification.findById(id);
}

async function updateNotification(id, update) {
  return await Notification.findByIdAndUpdate(id, update);
}

export {
  createNotification,
  findUserNotifications,
  findNotificationById,
  updateNotification,
};
