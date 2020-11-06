<template>
  <v-container :key="renderKey">
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <v-card class="mx-auto" max-width="600">
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://picsum.photos/600/300"
          >
            <v-card-title>Get commit history with 1 click!</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">
            Total commits:
            {{
              this.commits.length > 1 ? this.commits.length : "No commits yet!"
            }}
          </v-card-subtitle>

          <v-spacer></v-spacer>

          <v-card-text
            class="text--primary"
            v-for="item in commits"
            :key="item.text"
            :data-item="item"
          >
            <div>Author: {{ item.commit.committer.name }}</div>
            <div>Message: {{ item.commit.message }}</div>
            <div>Date: {{ item.commit.committer.date }}</div>
          </v-card-text>

          <v-card-actions style="display: block;">
            <v-btn color="blue" text @click="getRepoCommits">
              Refresh commits history!
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {getRepoCommits} from "../api/api"
import {repository} from "../../package.json"

export default {
  name: "ViewCommits",

  data: () => ({
    renderKey: 0,
    commits: {},
    repository: repository
  }),
  methods: {
    async getRepoCommits() {
      let commits = await getRepoCommits(repository);
      this.commits = commits;
      this.renderKey += 1;
    }
  },
  mounted() {
    this.getRepoCommits();
  }
};
</script>
