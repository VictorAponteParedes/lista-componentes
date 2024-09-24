import { StyleSheet } from "react-native";



export const estiloModal = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    containerClose: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    containerModal: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginHorizontal: "5%",
        borderRadius: 15,
        position: 'relative'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    subTitle: {
        fontSize: 16,
        textAlign: 'center'
    },
    buttomContainer: {
        marginTop: 20,
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center'
    },
    textButtom: {
        textAlign: "center",
        fontSize: 20,
        color: "black"
    }
});