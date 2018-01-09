(async function() {
  await new Promise(res => {
    setTimeout(() => {
      process.stdout.write('Checking some other things');
      res();
    }, 2000);
  });
})();
