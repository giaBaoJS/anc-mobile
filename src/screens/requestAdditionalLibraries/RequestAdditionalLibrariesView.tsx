import React from "react";
import { StyleSheet, Text } from "react-native";
import { Container } from "../../components/container";

interface Props {};

const RequestAdditionalLibrariesView: React.FC = (props: Props) => {
    return (
        <Container>
            <Text>RequestAdditionalLibraries Screen</Text>
        </Container>
    )
};

export default RequestAdditionalLibrariesView;

const styles = StyleSheet.create({});