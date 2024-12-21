<script>

</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; 2024 Ahmad Aril Samsi. All rights reserved.</p>
      <div class="social-links">
        <a href="https://www.instagram.com/arilsamsi/" target="_blank" class="social-link">Instagram</a>
        <a href="https://web.facebook.com/profile.php?id=100076206191055" target="_blank" class="social-link">Facebook</a>
        <a href="https://www.tiktok.com/@deyissmyluvvv?is_from_webapp=1&sender_device=pc" target="_blank" class="social-link">Tiktok</a>
      </div>
    </div>
  </footer>
</template>

<style>
.footer {
  background-color: #1c1c1e;
  color: #ffffff;
  text-align: center;
  padding: 30px 20px;
  position: relative;
  bottom: 0;
  width: 100%;
  /* height: 100px; */
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer p {
  font-size: 1rem;
  margin: 5px 0;
  color: #b3b3b3;
}

.social-links {
  margin-top: 10px;
}

.social-link {
  color: #ffb400;
  font-size: 1.1rem;
  margin: 0 15px;
  text-decoration: none;
  transition: color 0.3s ease;
}

.social-link:hover {
  color: #e50914;
}

.social-link:focus {
  outline: none;
}

</style>