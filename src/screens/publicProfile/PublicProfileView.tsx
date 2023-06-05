import React from "react";
import { StyleSheet, Text } from "react-native";
import { Container } from "../../components/container";

interface Props {};

const PublicProfileView: React.FC = (props: Props) => {
    return (
        <Container>
            <Text>PublicProfile Screen</Text>
        </Container>
    )
};

export default PublicProfileView;

const styles = StyleSheet.create({});