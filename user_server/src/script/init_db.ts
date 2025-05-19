import mongoose from 'mongoose';

const mongoUri = 'mongodb://mongodb:27017/nexon';

async function seed() {
  await mongoose.connect(mongoUri);

  const User = mongoose.model('User', new mongoose.Schema({
    user_id: String,
    email: String,
    password: String,
    role: String,
  }));

  const Event = mongoose.model('Event', new mongoose.Schema({
    event_id: String,
    name: String,
    start_date: Date,
    end_date: Date,
  }));

  const Reward = mongoose.model('Reward', new mongoose.Schema({
    reward_id: String,
    event_id: String,
    reward_name: String,
    quantity: Number,
  }));

  const RewardReceipt = mongoose.model('RewardReceipt', new mongoose.Schema({
    user_id: String,
    reward_id: String,
    received_at: Date,
  }));

  await User.deleteMany({});
  await Event.deleteMany({});
  await Reward.deleteMany({});
  await RewardReceipt.deleteMany({});

  await User.insertMany([
    { user_id: 'user01', email: 'user01@test.com', password: 'hashed_pw_1', role: 'user' },
    { user_id: 'admin01', email: 'admin@test.com', password: 'hashed_pw_2', role: 'admin' },
  ]);

  await Event.insertMany([
    { event_id: 'event01', name: '출석 이벤트', start_date: new Date(), end_date: new Date() },
    { event_id: 'event02', name: '몬스터 퇴치 이벤트', start_date: new Date(), end_date: new Date() },
  ]);

  await Reward.insertMany([
    { reward_id: 'reward01', event_id: 'event01', reward_name: '출석 보상', quantity: 100 },
    { reward_id: 'reward02', event_id: 'event02', reward_name: '퇴치 보상', quantity: 50 },
  ]);

  await RewardReceipt.insertMany([
    { user_id: 'user01', reward_id: 'reward01', received_at: new Date() },
  ]);

  console.log('✅ Seed data inserted');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});