# Lab 07: Micro Frontends e a Loja Frankenstein 🧟

Neste laboratório, vamos aprender como desacoplar o Front-end usando o padrão **Micro Frontends** e como otimizar a experiência do usuário com um **BFF (Backend-For-Frontend)**.

## ⏱️ Tempo Estimado
- **Missão Alunos:** 20 minutos
- **Masterclass Professor:** 10 minutos

## 🎯 Seus Objetivos
1. **Ganhar Performance com BFF (Time do Catálogo):** Altere o `fetch` para `/api/bff/home`.
2. **Desacoplar a Comunicação (Integração):** Use `CustomEvent` chamado `cart:add`.

## 🧪 Como Testar
```bash
uvicorn main:app --reload
pytest test_lab07.py -v
```
