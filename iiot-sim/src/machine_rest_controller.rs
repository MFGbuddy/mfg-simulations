use actix_web::{web, HttpResponse, Responder};
use serde::Serialize;
use crate::shared_machine::{ActiveMachine, SharedState};

#[derive(Serialize)]
struct MachineResponse {
    message: String,
    machine: String,
}

pub async fn start_machine(
    machine_type: web::Path<String>,
    state: web::Data<SharedState>,
) -> impl Responder {
    let mut machine = state.lock().unwrap();
    match machine_type.as_str() {
        "tabletpress" => *machine = ActiveMachine::TabletPress,
        _ => {
            return HttpResponse::BadRequest().json(MachineResponse {
                message: "Machine Not Supported".to_string(),
                machine: machine_type.to_string(),
            });
        }
    }
    HttpResponse::Ok().body(format!("{} Machine Started", machine_type))
}

pub async fn stop_machine(state: web::Data<SharedState>) -> impl Responder {
    let mut machine = state.lock().unwrap();
    *machine = ActiveMachine::None;
    HttpResponse::Ok().body("Simulation stopped")
}