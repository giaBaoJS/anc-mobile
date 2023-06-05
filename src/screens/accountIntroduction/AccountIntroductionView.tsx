import React from "react";
import { StyleSheet, Text } from "react-native";
import { Container } from "../../components/container";

interface Props {};

const AccountIntroductionView: React.FC = (props: Props) => {
    return (
        <Container>
            <Text>AccountIntroduction Screen</Text>
        </Container>
    )
};

export default AccountIntroductionView;

const styles = StyleSheet.create({});