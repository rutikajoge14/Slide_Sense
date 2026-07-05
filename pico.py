import network
import time
import urequests
import machine
from machine import Pin, ADC, I2C
import dht
import random

# ===== WiFi Credentials =====
WIFI_SSID = 'Redmi 9 Power'
WIFI_PASSWORD = 'thesameasyours'

API_URL = "https://slidesense.ashishvegan.com/api.php"

# ===== WiFi Connect =====
def connect_wifi():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(WIFI_SSID, WIFI_PASSWORD)
    while not wlan.isconnected():
        print("Connecting WiFi...")
        time.sleep(1)
    print("Connected:", wlan.ifconfig())

# ===== Sensors =====
dht_sensor = dht.DHT11(Pin(15))
soil_sensor = ADC(Pin(26))
gas_sensor = ADC(Pin(27))
rain_sensor = ADC(Pin(28))
vibration = Pin(14, Pin.IN)

trig = Pin(16, Pin.OUT)
echo = Pin(17, Pin.IN)

# Accelerometer (MPU6050)
i2c = I2C(0, scl=Pin(1), sda=Pin(0))
MPU_ADDR = 0x53
i2c.writeto_mem(MPU_ADDR, 0x6B, b'\x00')

# ===== Utility Functions =====
def read_accel():
    data = i2c.readfrom_mem(MPU_ADDR, 0x3B, 6)
    ax = int.from_bytes(data[0:2], 'big') >> 2
    return ax

def read_distance():
    trig.low()
    time.sleep_us(2)
    trig.high()
    time.sleep_us(10)
    trig.low()
    while echo.value() == 0:
        start = time.ticks_us()
    while echo.value() == 1:
        end = time.ticks_us()
    duration = time.ticks_diff(end, start)
    return round((duration * 0.0343) / 2, 2)

def adc_to_percentage(raw_value):
    return round((raw_value / 65535) * 100, 2)

def gas_to_ppm(raw_value):
    return round((raw_value / 65535) * 1000, 2)

def read_rain_status(raw_value):
    return "RAIN" if raw_value < 30000 else "NO RAIN"

# ===== Fake GPS (Randomized around your coordinate) =====
def get_fake_location():
    base_lat = 21.213627135751004
    base_lon = 78.9729974077965
    lat = base_lat + random.uniform(-0.000500, 0.000500)
    lon = base_lon + random.uniform(-0.000500, 0.000500)
    return round(lat, 9), round(lon, 9)

# ===== MAIN LOOP =====
connect_wifi()
while True:

    try:
        dht_sensor.measure()
        temp = dht_sensor.temperature()
        humidity = dht_sensor.humidity()
    except:
        temp = humidity = 0

    soil = adc_to_percentage(soil_sensor.read_u16())
    gas_ppm = gas_to_ppm(gas_sensor.read_u16())
    rain = read_rain_status(rain_sensor.read_u16())

    # Active LOW vibration sensor
    vib_status = "YES" if vibration.value() == 0 else "NO"

    dist = read_distance()
    accel = read_accel()
    lat, long = get_fake_location()

    print("\nSending:")
    print("Temp:", temp)
    print("Humidity:", humidity)
    print("Soil %:", soil)
    print("Gas PPM:", gas_ppm)
    print("Rain:", rain)
    print("Vibration:", vib_status)
    print("Distance CM:", dist)
    print("Accelerometer:", accel)
    print("Latitude:", lat)
    print("Longitude:", long)

    payload = {
        "tempearture": temp,
        "humidity": humidity,
        "soil_moisture": soil,
        "gases": gas_ppm,
        "rain_status": rain,
        "vib_status": vib_status,
        "distance": dist,
        "accelerometer": accel,
        "lat": lat,
        "longg": long
    }

    try:
        res = urequests.post(API_URL, json=payload)
        print("Response:", res.text)
        res.close()
    except Exception as e:
        print("HTTP ERROR:", e)

    time.sleep(20)
