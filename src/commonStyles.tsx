import {
    StyleSheet,
} from 'react-native';

export const commonStyles = StyleSheet.create({
    headerView: {
        backgroundColor: 'lightgreen',
        padding: 10,
    },
    headerText: {
        fontSize: 24,
        color: 'darkgreen',
        fontFamily: 'Bona Nova',
    },
    body: {
        fontSize: 16,
        color: 'black',
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
