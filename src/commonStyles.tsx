import {
    StyleSheet,
} from 'react-native';

export const commonStyles = StyleSheet.create({
    // Common styles for all components
    safeAreaView: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    backgroundImg: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },

    // Common Header
    headerView: {
        flexDirection: 'row',
        padding: 10,
    },
    headerText: {
        fontSize: 35,
        color: 'darkgreen',
        fontWeight: '600',
        letterSpacing: 4,
        left: 50,
    },
    profileImage: {
        width: 35,
        height: 35,
        left: 100,
        top: 6,
    },

    // Common Stack Navigator
    stackContent: {
        paddingTop: 60,
        paddingHorizontal: 10,
    },
    stackHeaderText: {
        fontSize: 24,
        color: 'darkgreen',
    },

    // Common Pages
    body: {
        flex: 1,
        fontSize: 16,
        color: 'black',
        justifyContent: 'space-between',
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },

    // Components
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    calendar: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        margin: 10,
        borderWidth: 1,
    },
});
