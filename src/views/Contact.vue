<template>
  <div>
    <h1>Contact Page</h1>
    <p>Get in touch with us!</p>
    <form>
      <label for="name">Name:</label>
      <input type="text" id="name" name="name"><br><br>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email"><br><br>
      <label for="message">Message:</label>
      <textarea id="message" name="message"></textarea><br><br>
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Contact'
}
</script>