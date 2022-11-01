import signup from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'
import SignupPage from '../pages/SignupPage'

describe('Cadastro', () => {

    //  beforeEach(function () {
    //
    //     cy.fixture('entregador').then((e) => {
    //         this.entregador = e
    //
    //      })
    //      })

    it('Usuário deve se tornar um entregador', function () {

        var entregador = signupFactory.entregador()

        signup.go()
        signup.fillForm(entregador)
        signup.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)


    })

    it('CPF inválido', function () {

        var entregador = signupFactory.entregador()
        entregador.cpf = '40A0A217800'

        signup.go()
        signup.fillForm(entregador)
        signup.submit()
        signup.alertMessageShouldBe('Oops! CPF inválido')


    })


    it('Email inválido', function () {

        var entregador = signupFactory.entregador()
        entregador.email = 'lipe_k08.hotmail.com'

        signup.go()
        signup.fillForm(entregador)
        signup.submit()
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')




    })

    context('Campos obrigatórios', function () {

        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'name', output: 'É necessário informar o CPF' },
            { field: 'name', output: 'É necessário informar o email' },
            { field: 'name', output: 'É necessário informar o CEP' },
            { field: 'name', output: 'É necessário informar o número do endereço' },
            { field: 'name', output: 'Selecione o método de entrega' },
            { field: 'name', output: 'Adicione uma foto da sua CNH' }
        ]

        before(function(){
            SignupPage.go()
            SignupPage.submit()

        })

        messages.forEach(function(msg){
            it('${msg.field} is required', function (){
                SignupPage.alertMessageShouldBe(msg.output)
            })

        })

    })

})