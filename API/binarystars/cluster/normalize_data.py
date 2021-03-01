import numpy as np

def minmax(data_list: list) -> np.ndarray:
    arr = np.array(data_list)
    dividend = np.subtract(arr, np.min(arr))
    divisor = np.subtract(np.max(arr), np.min(arr))
    return np.divide(dividend, divisor)

def amp_scaling(data_list: list) -> np.ndarray:
    arr = np.array(data_list)
    dividend = np.subtract(arr, np.mean(arr))
    return np.divide(dividend, np.std(arr))

def ratio(numerators: list, denominators: list) -> np.ndarray:
    return np.divide(numerators, denominators)

def offset_translation(data_list: list) -> np.ndarray:
    arr = np.array(data_list)
    return np.subtract(arr, np.min(arr))