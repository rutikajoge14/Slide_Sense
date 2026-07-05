id = i2c.readfrom_mem(ADXL_ADDR, 0x00, 1)
print("Device ID:", id)
