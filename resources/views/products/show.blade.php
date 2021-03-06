@extends('layouts.master')

@section('content')
<div class="col-md-12">
    <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="col p-4 d-flex flex-column position-static">
            @foreach ($product->categories as $category)
                <span class="d-inline text-primary">{{$category->name}}</span>
            @endforeach  
            <h5 class="mb-0">{{$product->title}}</h5>
            <div class="mb-1 text-muted">{{$product->created_at->format('d/Y/m')}}</div>
            <p class="card-text mb-auto">{!!$product->description!!}</p>
            <strong class="card-text mb-auto">{{$product->getPrice()}}</strong>
            <form action="{{route('cart.store')}}" method="POST">
                @csrf
                <input type="hidden" name="product_id" value="{{$product->id}}">
                <button type="submit" class="btn btn-info mt-2">Ajouter au pannier</button>
            </form>
        </div>  
        <div class="col-auto d-none d-lg-block">
            <img src="{{asset("storage/".$product->image)}}" alt="">
        </div>
    </div>
</div>
@endsection
