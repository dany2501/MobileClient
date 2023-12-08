import { StyleSheet } from 'react-native';
import { colors } from '../../../colors/colors';
import Dimens from '../../../Styles/Dimens';
import Fonts from '../../../Styles/Fonts';
export default StyleSheet.create({
    screenCard: {
        height: 100,
        borderRadius: 10,
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center"
    },
    screenCardContainer: {
        flexDirection: "row",
        marginHorizontal: 10,
        justifyContent: "space-between",
        marginTop: 10
    },
    screenCardButton: {
        width: "48%"
    },
    externalLink: {
        height: 50,
        marginBottom: 0.1,
        backgroundColor: colors.white,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        flexDirection: "row",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.radiobutton
    },
    externalLinkText:{
        fontSize:24,
        fontFamily:Fonts.NAME.regular,
        color:colors.buttonDisabled
    },
    logout: {
        height: 50,
        width: "100%",
        backgroundColor: colors.white,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        marginTop:60,
        bottom:20
    },
    informationTitleContainer: {
        marginHorizontal: 20,
        marginTop: 20,
        alignSelf: "center"
    },
    informationTitle: {
        fontFamily: Fonts.NAME.semiBold,
        fontSize: 30,
        color: colors.black
    },
    iconContainer:{
        justifyContent:"center",
        alignItems:"center",
        borderRadius:30,
        height:50,
        width:50
    }
})