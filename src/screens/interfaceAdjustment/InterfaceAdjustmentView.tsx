import React from "react";
import { StyleSheet, Text } from "react-native";
import { Container } from "../../components/container";

interface Props {};

const InterfaceAdjustmentView: React.FC = (props: Props) => {
    return (
        <Container>
            <Text>InterfaceAdjustment Screen</Text>
        </Container>
    )
};

export default InterfaceAdjustmentView;

const styles = StyleSheet.create({});