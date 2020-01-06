<template>
  <v-container class="container fill-height" fluid>
    <div class="questionBox" id="app">
      <transition
        :duration="{ enter: 0, leave: 0 }"
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut"
        mode="out-in"
      >
        <v-card class="questionContainer" :key="questionIndex">
          <v-card-title>Personality Assessment</v-card-title>
          <v-card-subtitle>
            <v-progress-linear
              class="progressContainer"
              color="light-blue"
              height="10"
              :value="progress"
              striped
            ></v-progress-linear>
            {{Math.floor(progress)}}% complete
          </v-card-subtitle>
          <v-card-text>
            <h2 class="titleContainer title">{{questions[questionIndex].text}}</h2>
            <div class="optionContainer">
              <div
                class="option"
                v-for="(response,index) in questions[questionIndex].choices"
                @click="selectOption(index,response)"
                :class="{ 'is-selected': answers[questionIndex]&&answers[questionIndex].selected== index}"
                :key="index"
              >{{index | charIndex}}.{{response.text}}</div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="prev()" :disabled="questionIndex<1">Back</v-btn>
            <v-btn
              :class="(answers[questionIndex]==null)?'':'is-active'"
              @click="next()"
              :disabled="questionIndex==questions.length-1"
            >{{(answers[questionIndex]==null)?'Skip':'Next'}}</v-btn>
            <v-btn @click="results()" v-show="questionIndex==questions.length-1">Results</v-btn>
          </v-card-actions>
        </v-card>
      </transition>
    </div>
  </v-container>
</template>

<script>
import { APIService } from "../api/APIService";
const apiService = new APIService();
const {
  getItems,
  getInfo
} = require("@alheimsins/b5-johnson-120-ipip-neo-pi-r");
export default {
  data: () => {
    return {
      questions: getItems(),
      info: getInfo(),
      answers: Array(120).fill(null),
      questionIndex: 0
    };
  },
  methods: {
    selectOption(index, response) {
      let question = this.questions[this.questionIndex];
      let answer = {
        domain: question["domain"],
        facet: question["facet"],
        score: response["score"],
        selected: index
      };
      if (
        this.answers[this.questionIndex] &&
        this.answers[this.questionIndex].score == answer.score
      ) {
        this.answers[this.questionIndex] = null;
        this.questionIndex++;
        this.questionIndex--;
      } else {
        this.answers[this.questionIndex] = Object.assign({}, answer);
        this.questionIndex--;
        this.questionIndex++;
        if (this.questionIndex < this.questions.length - 1)
          this.questionIndex++;
      }
    },
    prev() {
      if (this.questionIndex > 0) this.questionIndex--;
    },
    next() {
      if (this.questionIndex < this.questions.length - 1) this.questionIndex++;
    },
    results() {
      debugger;
      const _answers = this.answers.map(
        ({ selected, ...answers }) => answers,
        this
      );
      const result = {
        ...getInfo(),
        lang: "en",
        answers: _answers,
        timeElapsed: 10,
        dateStamp: Date.now()
      };
      apiService.createPersonality(result).then(
        resp => {
          if (resp.status === 201) this.personality = result.data;
        },
        error => (this.showError = true)
      );
      this.$emit("results", result);
    }
  },
  filters: {
    charIndex: function(i) {
      return String.fromCharCode(97 + i);
    }
  },
  computed: {
    progress: {
      get() {
        return (this.questionIndex * 100) / (this.questions.length - 1);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$trans_duration: 0.3s;
$primary_color: #3d5afe;

@import url("https://fonts.googleapis.com/css?family=Montserrat:400,400i,700");
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700");
body {
  font-family: "Open Sans", sans-serif;
  font-size: 14px;

  height: 100vh;

  background: #cfd8dc;

  /* mocking native UI */
  cursor: default !important; /* remove text selection cursor */
  user-select: none; /* remove text selection */
  user-drag: none; /* disbale element dragging */

  display: flex;
  align-items: center;
  justify-content: center;
}

.button {
  transition: $trans_duration;
}
.title,
.subtitle {
  font-family: Montserrat, sans-serif;
  font-weight: normal;
}
.animated {
  transition-duration: $trans_duration/2;
}

.container {
  margin: 0 0.5rem;
  display: flex;
  justify-content: center;
}

.questionBox {
  max-width: 30rem;
  width: 30rem;
  min-height: 30rem;

  background: #fafafa;
  position: relative;
  display: flex;

  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

  header {
    background: rgba(0, 0, 0, 0.025);
    padding: 1.5rem;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    h1 {
      font-weight: bold;
      margin-bottom: 1rem !important;
    }
    .progressContainer {
      width: 60%;
      margin: 0 auto;
      > progress {
        margin: 0;
        border-radius: 5rem;
        overflow: hidden;
        border: none;

        color: $primary_color;
        &::-moz-progress-bar {
          background: $primary_color;
        }
        &::-webkit-progress-value {
          background: $primary_color;
        }
      }
      > p {
        margin: 0;
        margin-top: 0.5rem;
      }
    }
  }
  .titleContainer {
    text-align: center;
    margin: 0 auto;
    padding: 1.5rem;
    padding-top: 0;
  }

  .quizForm {
    display: block;
    white-space: normal;

    height: 100%;
    width: 100%;

    .quizFormContainer {
      height: 100%;
      margin: 15px 18px;

      .field-label {
        text-align: left;
        margin-bottom: 0.5rem;
      }
    }
  }
  .quizCompleted {
    width: 100%;
    padding: 1rem;
    text-align: center;

    > .icon {
      color: #ff5252;
      font-size: 5rem;

      .is-active {
        color: #00e676;
      }
    }
  }
  .questionContainer {
    white-space: normal;

    height: 100%;
    width: 100%;

    .optionContainer {
      margin-top: 12px;
      flex-grow: 1;
      .option {
        border-radius: 290486px;
        padding: 9px 18px;
        margin: 0 18px;
        margin-bottom: 12px;
        transition: $trans_duration;
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.05);
        color: rgba(0, 0, 0, 0.85);
        border: transparent 1px solid;

        &.is-selected {
          border-color: rgba(black, 0.25);
          background-color: white;
        }
        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
        &:active {
          transform: scaleX(0.9);
        }
      }
    }

    .questionFooter {
      background: rgba(0, 0, 0, 0.025);
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      width: 100%;
      align-self: flex-end;

      .pagination {
        //padding: 10px 15px;
        margin: 15px 25px;
      }
    }
  }
}
.pagination {
  display: flex;
  justify-content: space-between;
}
.button {
  padding: 0.5rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 5rem;
  margin: 0 0.25rem;

  transition: 0.3s;

  &:hover {
    cursor: pointer;
    background: #eceff1;
    border-color: rgba(0, 0, 0, 0.25);
  }
  &.is-active {
    background: $primary_color;
    color: white;
    border-color: transparent;

    &:hover {
      background: darken($primary_color, 10%);
    }
  }
}

@media screen and (min-width: 769px) {
  .questionBox {
    align-items: center;
    justify-content: center;

    .questionContainer {
      display: flex;
      flex-direction: column;
    }
  }
}

@media screen and (max-width: 768px) {
  .sidebar {
    height: auto !important;
    border-radius: 6px 6px 0px 0px;
  }
}
</style>