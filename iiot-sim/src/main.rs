mod machine;
mod mc_tablet_press;
mod mqtt_client;
mod shared_machine;
mod machine_rest_controller;
mod simulation_loop;

use std::sync::{Arc, Mutex};

use actix_web::{web, App, HttpServer, http};
use actix_cors::Cors;


use shared_machine::{ActiveMachine};
use simulation_loop::start_simulation_loop;


#[actix_web::main]
async fn main() -> std::io::Result<()> {

    let mqtt = Arc::new(mqtt_client::MqttPublisher::new(
        "tcp://test.mosquitto.org:1883", 
        "iiot_simulator-rust"
    ));

    let active_machine = Arc::new(Mutex::new(ActiveMachine::None));

     start_simulation_loop(active_machine.clone(), mqtt.clone());
   
     HttpServer::new(move || {

        let cors = Cors::default()
        .allowed_origin("http://localhost:5173")
        .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
        .allowed_headers(vec![http::header::CONTENT_TYPE])
        .max_age(3600);

        App::new()
            .wrap(cors)
            .app_data(web::Data::new(active_machine.clone()))
            .route("/machine/start/{machine_type}", web::get().to(machine_rest_controller::start_machine))
            .route("/machine/stop", web::get().to(machine_rest_controller::stop_machine))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await

}
