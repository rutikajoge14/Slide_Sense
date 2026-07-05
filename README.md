---

# 🌍 SlideSense

### An Intelligent Landslide Detection and Alert System

SlideSense is an **IoT-based landslide monitoring and early warning system** designed to detect environmental conditions that may lead to landslides and provide timely alerts. The project integrates **sensor data, microcontroller processing, and a web-based dashboard** to enhance disaster preparedness and reduce potential damage.

---

## 🚀 Features

* 📡 Real-time monitoring of environmental parameters
* 🌧️ Early detection of landslide-prone conditions
* 📊 Web dashboard for live data visualization
* ⚠️ Alert mechanism for risk notification
* 🔌 IoT-based sensor integration
* 🖥️ Simple and user-friendly interface

---

## 🛠️ Tech Stack

### Hardware

* Microcontroller (Raspberry Pi Pico / similar)
* Environmental sensors (e.g., moisture, tilt, vibration)
* I2C communication module

### Software

* **Python** – Sensor data collection & processing
* **PHP** – Backend logic
* **HTML / CSS** – Frontend UI
* **JavaScript** – Dashboard interaction
* **MySQL (optional)** – Data storage

---

## 📂 Project Structure

```bash
SlideSense/
│
├── i2c.py              # I2C communication with sensors
├── pico.py             # Microcontroller logic
├── index.php           # Landing page
├── dashboard.php       # Monitoring dashboard
├── assets/             # CSS, JS, images
├── README.md           # Project documentation
```

---

## ⚙️ How It Works

1. Sensors continuously collect environmental data
2. Microcontroller processes sensor readings
3. Data is transmitted to the server
4. Web dashboard displays real-time data
5. Alerts are triggered when values cross safe thresholds

---

## ▶️ How to Run the Project

### Prerequisites

* Python 3.x
* PHP server (XAMPP / WAMP / LAMP)
* Microcontroller with connected sensors

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/harshrmeshram/SlideSense.git
   ```
2. Upload `pico.py` to the microcontroller
3. Start the PHP server and place files in the server directory
4. Open `index.php` in your browser
5. Monitor sensor data on the dashboard

---

## 📈 Future Enhancements

* SMS / Email alert integration
* AI-based landslide prediction
* Cloud-based data storage
* Mobile application support
* GPS-based location tracking

---

## 👨‍💻 Author

**Harsh Rahul Meshram**
B.Tech – Artificial Intelligence & Data Science
Nagpur, Maharashtra

📧 Email: [harshr.meshram@gmail.com](mailto:harshr.meshram@gmail.com)
🔗 GitHub: [https://github.com/harshrmeshram](https://github.com/harshrmeshram)

---

## 📜 License

This project is for **educational and research purposes**.
Feel free to use and modify it with proper credits.

---

