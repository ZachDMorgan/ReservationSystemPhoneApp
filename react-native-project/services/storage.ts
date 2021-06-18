import AsyncStorage from '@react-native-async-storage/async-storage'

export async function getStorage() {
    try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
            return value;
        }
        else {
            return null;
        }

    } catch (error) {
        return null;
    }
}

export async function clearStorage() {
    try {
        await AsyncStorage.removeItem("token");
    } catch (error) {
        console.log(error);
    }
};

export async function saveToken(t: string) {
    try {
        await AsyncStorage.setItem(
            "token",
            t
        );
    } catch (error) {
        console.log(error);
    }
};