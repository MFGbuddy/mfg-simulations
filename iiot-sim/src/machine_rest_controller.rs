use actix_web::{web, HttpResponse, Responder};

use crate::shared_machine::{ActiveMachine, SharedState};

pub async fn start_machine(
    machine_type: web::Path<String>,
    state: web::Data<SharedState>,
) -> impl Responder {
    let mut machine = state.lock().unwrap();
    match machine_type.as_str() {
        "tabletpress" => *machine = ActiveMachine::TabletPress,
        
        _ => return HttpResponse::BadRequest().body(format!("{} Machine Not Supported", machine_type)),
    }
    HttpResponse::Ok().body(format!("{} Machine Started", machine_type))
}

pub async fn stop_machine(state: web::Data<SharedState>) -> impl Responder {
    let mut machine = state.lock().unwrap();
    *machine = ActiveMachine::None;
    HttpResponse::Ok().body("Simulation stopped")
}