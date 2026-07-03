<template>
  <div class="newsletter-signup">
    <div class="signup-inner">
      <h5>📬 邮件订阅新文章</h5>
      <form action="https://api.follow.it/subscription-form/YlA3bTkrZXQ4MkZKQjVvbHcvb3BDelEyb1AwaWRnZEpTMFFGYVZYa2NsNVFEYk80bEZFSGhrSXc1WTNValRoYVRqWm9XY0tvTkkxd2JGN3lhZlBUZ1pQeHlUSGhQdTFVd3JXMFd0SXUrTHJOZ1VTNVFmNVdtY3g2ZWVvNHdGZzJ8VklpZGozeW5lQmhkcEFpS2ZObkY5MXl2Tkp6YVFKLy9OV0NMT1gvV1F0ND0=/8" method="post">
        <input type="email" name="email" required placeholder="输入邮箱地址" />
        <button type="submit">订阅</button>
      </form>
      <p class="signup-hint">有新文章时自动发到邮箱，不打扰。</p>
    </div>
  </div>
</template>

<style scoped>
.newsletter-signup {
  margin-bottom: 32px;
}

.signup-inner {
  padding: 24px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.signup-inner h5 {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.signup-inner form {
  display: flex;
  gap: 8px;
}

.signup-inner input {
  flex: 1;
  height: 40px;
  padding: 0 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  outline: none;
}

.signup-inner input:focus {
  border-color: var(--vp-c-brand);
}

.signup-inner button {
  height: 40px;
  padding: 0 20px;
  border: none;
  border-radius: 6px;
  background: var(--vp-c-brand);
  color: var(--vp-c-white);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.signup-inner button:hover {
  opacity: 0.85;
}

.signup-hint {
  margin: 12px 0 0 0;
  font-size: 12px;
  color: var(--vp-c-text-3);
}
</style>
