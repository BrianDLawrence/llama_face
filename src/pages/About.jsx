import React from "react";

const About = () => {
  return (
    <div className="px-2">
      <div className="flex justify-center py-10">
        <div className="prose lg:prose-xl">
          <h1>What is this?</h1>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="pb-8 prose text-sm md:text-base py-2">
          <p>
            This Python project leverages LangChain and Ollama models to develop
            an AI agent powered by local large language models (LLMs). The
            initial focus is on optimizing calendar management and task
            organization.
          </p>

          <p>
            This is a high level architecture diagram of the project. This UI is
            React Web client.
          </p>

          <img
            src="/images/LlamaHerder.png"
            alt="High level architecture of Llama Herder"
          />

          <p>All source code is available licensed under the MIT License.</p>

          <ul>
            <li>
              <a href="https://github.com/BrianDLawrence/llama_face">
                Llama Face / React Front End - Repository
              </a>
            </li>
            <li>
              <a href="https://github.com/BrianDLawrence/llama_djangohub">
                Llama Hub / Django Rest App Server - Repository
              </a>
            </li>
            <li>
              <a href="https://github.com/BrianDLawrence/llama_herder">
                Llama Herder / Python Backend - to be run locally on your own
                machine - Repository
              </a>
            </li>
          </ul>

          <h3>Disclaimer</h3>
          <p>
            Please note that this website is currently a work in progress and is
            intended for internal testing purposes only. The content and
            features you see here are under active development and may change
            frequently. We make no guarantees or promises regarding the
            accuracy, completeness, or reliability of any information or
            functionality presented on this site. Users should be aware that
            data and performance may be incomplete or subject to revision. Thank
            you for your understanding and patience as we work to improve and
            finalize our services.
          </p>

          <p>Copyright &copy; 2024 Spero Autem LLC</p>
        </div>
      </div>
    </div>
  );
};

export default About;
