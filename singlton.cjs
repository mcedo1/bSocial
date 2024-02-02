class AppleBasket {
  constructor() {
    if (!AppleBasket.instance) {
      this.numberOfApples = null;
      AppleBasket.instance = this;
    }

    return AppleBasket.instance;
  }

  // Method to increase the number of apples
  addApples(count) {
    this.numberOfApples = count;
  }

  // Method to decrease the number of apples

  // Method to get the current number of apples
  getApplesCount() {
    return this.numberOfApples;
  }
}

module.exports = {
  AppleBasket
} 
