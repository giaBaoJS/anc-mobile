import React from "react";
import { StyleSheet, Text } from "react-native";
import { Container } from "../../components/container";

interface Props {};

const AccountManagementView: React.FC = (props: Props) => {
    return (
        <Container>
            <Text>AccountManagement Screen</Text>
        </Container>
    )
};

export default AccountManagementView;

const styles = StyleSheet.create({});